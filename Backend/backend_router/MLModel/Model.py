# model.py

import os
import asyncio
import nest_asyncio
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain.prompts import PromptTemplate
from langchain.chains.question_answering import load_qa_chain
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI

# Apply nested asyncio for environments like Jupyter/ASGI servers
nest_asyncio.apply()
asyncio.set_event_loop(asyncio.new_event_loop())

# Set your Google API Key (ensure this is set in your .env or config in real usage)
GOOGLE_API_KEY = "AIzaSyBJjnvpb5NRIcDLWxnGQu1qVbXGdU1Van4"
os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY
import google.generativeai as genai
genai.configure(api_key=GOOGLE_API_KEY)

# ---------------------------------------
# PDF TEXT EXTRACTION
# ---------------------------------------

def extract_text_from_pdf(path: str) -> str:
    """Extract all text from a PDF file."""
    text = ""
    with open(path, "rb") as f:
        reader = PdfReader(f)
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text
    return text


# ---------------------------------------
# TEXT CHUNKING
# ---------------------------------------

def chunk_text(text: str, chunk_size=10000, chunk_overlap=1000) -> list:
    """Split long text into smaller overlapping chunks."""
    splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
    return splitter.split_text(text)


# ---------------------------------------
# VECTOR STORE CREATION
# ---------------------------------------

def create_vector_store_from_pdf(pdf_path: str, vector_store_dir: str):
    """Extract, chunk, embed, and save vector store locally."""
    raw_text = extract_text_from_pdf(pdf_path)
    chunks = chunk_text(raw_text)
    
    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/embedding-001",
        google_api_key=GOOGLE_API_KEY
    )

    store = FAISS.from_texts(chunks, embedding=embeddings)
    store.save_local(vector_store_dir)


# ---------------------------------------
# QUESTION ANSWERING CHAIN
# ---------------------------------------

def build_qa_chain():
    """Create a QA chain using Google Generative AI."""
    prompt = PromptTemplate(
        template="""
        Answer the question as detailed as possible from the provided context.
        If the answer is not in the context, respond with "answer is not available in the context".

        Context:
        {context}

        Question:
        {question}

        Answer:
        """,
        input_variables=["context", "question"]
    )

    model = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",
        temperature=0.3,
        google_api_key=GOOGLE_API_KEY
    )

    return load_qa_chain(model, chain_type="stuff", prompt=prompt)


# ---------------------------------------
# ANSWER A QUESTION FROM LOCAL VECTOR STORE
# ---------------------------------------

async def answer_question_from_store(question: str, vector_store_dir: str) -> str:
    try:
        print(f"[DEBUG] Question received: {question}")
        print(f"[DEBUG] Vector store path: {vector_store_dir}")

        if not os.path.exists(vector_store_dir):
            return f"❌ Vector store not found at: {vector_store_dir}"

        embeddings = GoogleGenerativeAIEmbeddings(
            model="models/embedding-001",
            google_api_key=GOOGLE_API_KEY
        )

        print("[DEBUG] Loading FAISS vector store...")
        db = FAISS.load_local(vector_store_dir, embeddings, allow_dangerous_deserialization=True)

        print("[DEBUG] Performing similarity search...")
        docs = db.similarity_search(question)

        if not docs:
            return "❌ No relevant context found in the vector store."

        print("[DEBUG] Building QA chain...")
        chain = build_qa_chain()

        print("[DEBUG] Running chain asynchronously...")
        result = await chain.acall({
            "input_documents": docs,
            "question": question
        })

        print("[DEBUG] Chain result:", result)
        return result.get("output_text", "❌ No answer generated.")

    except Exception as e:
        print(f"❌ Exception in answering question: {str(e)}")
        return f"❌ Internal error: {str(e)}"