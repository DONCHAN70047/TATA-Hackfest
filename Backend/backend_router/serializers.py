from rest_framework import serializers
from .models import MLModel

class YourMLModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MLModel
        fields = ['id', 'file', 'name']  # example fields
