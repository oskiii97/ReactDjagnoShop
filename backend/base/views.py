from django.shortcuts import render
from django.http import JsonResponse
from .products import products
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import User 
from base.models import Produkt, Zamowienie, ZamowionyProdukt, AdresWysylki

from django.contrib.auth.hashers import make_password

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status

from.serializer import ProductSerializer, UserSerializer, UserSerializerWithToken
from .models import Produkt 
# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['first_name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
 
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Uzytkownik zostal utworzony'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


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
@permission_classes([IsAdminUser])
def getUsers(request):
	users = User.objects.all()
	serializer = UserSerializer(users, many=True)
	return Response(serializer.data)

@api_view(['GET'])
@permission_classes(IsAuthenticated)
def getUserProfile(request):
	user = request.user
	serializer = UserSerializer(user, many=False)
	return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
	product = Produkt.objects.get(_id=pk)
	serializer = ProductSerializer(product, many=False)
	return Response(serializer.data)




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:

        # Tworzenie zamownienia

        order = Zamowienie.objects.create(
            user=user,
            sposob_platnosc=data['paymentMethod'],
            cena_podatku=data['taxPrice'],
            koszt_wysylki=data['shippingPrice'],
            sum_cena=data['totalPrice']
        )

        # Tworzenie adresu wysylki 

        shipping = AdresWysylki.objects.create(
            order=order,
            adres=data['shippingAddress']['address'],
            miasto=data['shippingAddress']['city'],
            kod_pocztowy=data['shippingAddress']['postalCode'],
            kraj=data['shippingAddress']['country'],
        )

        # Utworzenie zamowienia i polacznie jego zamowionym produktem
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])

            item = ZamowionyProdukt.objects.create(
                product=Produkt,
                order=Zamowienie,
                name=Produkt.nazwa_prod,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url,
            )

            # Update magazynu

            product.countInStock -= item.qty
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)
        

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):

    user = request.user

    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail': 'Not authorized to view this order'},
                     status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)





