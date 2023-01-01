from django.contrib import admin
from .models import Produkt, Zamowienie, ZamowionyProdukt, AdresWysylki

# Register your models here.

admin.site.register(Produkt)
admin.site.register(Zamowienie)
admin.site.register(ZamowionyProdukt)
admin.site.register(AdresWysylki)
