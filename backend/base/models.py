from django.db import models
from django.contrib.auth.models import User 

# Create your models here.

class Produkt(models.Model):
	user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
	nazwa_prod = models.CharField(max_length=200, null=True, blank=True)
	zdjecie_prod = models.ImageField(null=True, blank=True)
	marka_prod = models.CharField(max_length=200, null=True, blank=True)
	kategoria = models.CharField(max_length=200, null=True, blank=True)
	opis_prod = models.TextField(null=True, blank=True)
	cena = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
	liczba_dost = models.IntegerField(null = True, blank=True, default = 0)
	_id = models.AutoField(primary_key=True, editable = False)

	def __str__(self):
		return self.nazwa_prod


class Zamowienie(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    sposob_platnosc = models.CharField(max_length=200, null=True, blank=True)
    cena_podatku = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    koszt_wysylki = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    sum_cena = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    oplacone = models.BooleanField(default=False)
    kiedy_oplacone = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    dostarczone = models.BooleanField(default=False)
    kiedy_dostarczone = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)
    kiedy_zamowione = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.kiedy_zamowione)

class ZamowionyProdukt(models.Model):
    produkt = models.ForeignKey(Produkt, on_delete=models.SET_NULL, null=True)
    zamowienie = models.ForeignKey(Zamowienie, on_delete=models.SET_NULL, null=True)
    nazwa = models.CharField(max_length=200, null=True, blank=True)
    ilosc = models.IntegerField(null=True, blank=True, default=0)
    cena = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    zdjecie = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.nazwa)


class AdresWysylki(models.Model):
    zamowienie = models.OneToOneField(
        Zamowienie, on_delete=models.CASCADE, null=True, blank=True)
    adres = models.CharField(max_length=200, null=True, blank=True)
    miasto = models.CharField(max_length=200, null=True, blank=True)
    kod_pocztowy = models.CharField(max_length=200, null=True, blank=True)
    kraj = models.CharField(max_length=200, null=True, blank=True)
    cena = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.adres)




