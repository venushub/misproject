from django.shortcuts import render
import csv,json
from django.http import HttpResponse
import base64
from django.contrib.auth.models import User
from django.core.files import File
from django.db import transaction
from django.views.decorators.csrf import csrf_exempt
from .models import Attendance


# Create your views here.

@csrf_exempt
def MatcherView(request):
    html = "<html><body>Hi</body></html>"

    jsonredata = json.loads(request.body)

    text = jsonredata['filebase64']

    base64string = text.split('base64,')[1]



    with open('data/encoded.txt', 'w') as f:
        myfile = File(f)
        myfile.write(base64string)
        print('doneeeeeeeeeeeeeee')

    # user = User.objects.get(pk=1)
    # user.profile.empCode = '98765'
    # user.save()
    #
    # print('done saving user')

    base64.decode(open('data/encoded.txt', 'r'), open('data/decoded.csv', 'wb'))
    #
    reader = csv.DictReader(open('data/decoded.csv', 'r'))
    out=open('data/out.json','w');
    out.write(json.dumps([row for row in reader]))


    json_data = open('data/out.json')
    data1 = json.load(json_data)
    print(data1[0]['cardno'])


    cardNo  = models.CharField(max_length=100)
    workGroup  = models.CharField(max_length=100)
    empCode  = models.CharField(max_length=100)
    firstName  = models.CharField(max_length=100)
    lastName  = models.CharField(max_length=100)
    firstIn = models.DateTimeField()
    lastOut = models.DateTimeField()
    totalHours = models.CharField(max_length=100)
    companyName = models.CharField(max_length=100)

    with transaction.commit_on_success():
        for item in data1:
            entry = Attendance(cardNo=item['cardno'],
                               workGroup=item['workgroup'],
                               empCode=item['Empcode'],
                               firstName=item['Firstname'],
                               lastName=item['Lastname'],
                               firstIn=item['FirstIn'],
                               
                               )
            entry.save()



    return HttpResponse(html)

# base64.decode(open('data/encoded.txt', 'r'), open('data/decoded.txt', 'w'))
