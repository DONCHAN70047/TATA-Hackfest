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


nest_asyncio.apply()
asyncio.set_event_loop(asyncio.new_event_loop())
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY
import google.generativeai as genai
genai.configure(api_key=GOOGLE_API_KEY)



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




def chunk_text(text: str, chunk_size=10000, chunk_overlap=1000) -> list:
    """Split long text into smaller overlapping chunks."""
    splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
    return splitter.split_text(text)



# VECTOR STORE CREATION
def create_vector_store_from_pdf(pdf_path: str, vector_store_dir: str):
    """Extract, chunk, embed, and save vector store locally."""
    os.makedirs(vector_store_dir, exist_ok=True)  
    raw_text = extract_text_from_pdf(pdf_path)
    chunks = chunk_text(raw_text)
    
    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/embedding-001",
        google_api_key=GOOGLE_API_KEY
    )

    store = FAISS.from_texts(chunks, embedding=embeddings)
    store.save_local(vector_store_dir)  




# QUESTION ANSWERING CHAIN
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


import os
import uuid
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter




# Process PDF & Create Vector Store
def process_pdf(file_path: str, base_vector_store_dir: str):
    file_id = str(uuid.uuid4())[:8]
    vector_store_path = os.path.join(base_vector_store_dir, file_id)

    os.makedirs(vector_store_path, exist_ok=True)

  
    loader = PyPDFLoader(file_path)
    documents = loader.load()


    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )
    docs = text_splitter.split_documents(documents)

   
    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/embedding-001",
        google_api_key=os.getenv("GOOGLE_API_KEY")  # ✅ safer than hardcoding
    )


    vectorstore = FAISS.from_documents(docs, embeddings)
    vectorstore.save_local(vector_store_path)

    return file_id  



# Answer Question from Vector Store
@staticmethod
def answer_question_from_store(question: str, file_id: str, base_vector_store_dir: str):
    vector_store_path = os.path.join(base_vector_store_dir, file_id)

    print(f"vector_store_path: {vector_store_path}")

    if not os.path.exists(vector_store_path):
        return f"❌ Vector store not found for FileID: {file_id}"

    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/embedding-001",
        google_api_key=os.getenv("GOOGLE_API_KEY")
    )

    # Load existing FAISS index
    vectorstore = FAISS.load_local(
        vector_store_path,
        embeddings,
        allow_dangerous_deserialization=True
    )

    # Perform similarity search
    docs = vectorstore.similarity_search(question, k=3)
    answer = "\n\n".join([doc.page_content for doc in docs])
    return answer

