from rest_framework import serializers
from django.contrib.auth.models import User 
from .models import Produkt 


class ProductSerializer(serializers.ModelSerializer):
	class Meta:
		model = Produkt
		fields = '__all__'