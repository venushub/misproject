from django.shortcuts import render
import csv,json
from django.http import HttpResponse
import base64
# Create your views here.


def SampleView(request):
    html = "<html><body>Hi</body></html>"


    base64.decode(open('data/encoded.txt', 'r'), open('data/decoded.csv', 'wb'))

    reader = csv.DictReader(open('data/decoded.csv', 'r'))
    out=open('data/out.json','w');
    out.write(json.dumps([row for row in reader]))





    return HttpResponse(html)


# base64.decode(open('data/encoded.txt', 'r'), open('data/decoded.txt', 'w'))
