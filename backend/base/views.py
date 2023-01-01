from django.shortcuts import render
from django.http import JsonResponse
from .products import products
from rest_framework.response import Response
from rest_framework.decorators import api_view

from.serializer import ProductSerializer
from .models import Produkt 
# Create your views here.


@api_view(['GET'])
def getRoutes(request):
	routes = [
		'/api/products/',
		'/api/products/create/',

		'/api/products/upload/',

		'/api/products/top/',
		'/api/products/<id>',

		'/api/products/delete/<id>/',
		'/api/products/<update>/<id>/'
		
	]
	return Response(routes)

@api_view(['GET'])
def getProducts(request):
	products = Produkt.objects.all()
	serializer = ProductSerializer(products, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
	product = Produkt.objects.get(_id=pk)
	serializer = ProductSerializer(product, many=False)
	return Response(serializer.data)