from django.shortcuts import render
import csv,json
from django.http import HttpResponse
import base64
from django.contrib.auth.models import User
from django.core.files import File
from django.db import transaction
from django.views.decorators.csrf import csrf_exempt
from .models import Attendance, AttendanceFile
import datetime
import hashlib

# Create your views here.

@csrf_exempt
def MatcherView(request):



    def monthToNum(shortMonth):

        return{
                'January' : 1,
                'February' : 2,
                'March' : 3,
                'April' : 4,
                'May' : 5,
                'June' : 6,
                'July' : 7,
                'August' : 8,
                'September' : 9,
                'October' : 10,
                'November' : 11,
                'December' : 12
        }[shortMonth]



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



    print("my month issssssssss", monthToNum('June'))


    # cardNo  = models.CharField(max_length=100)
    # workGroup  = models.CharField(max_length=100)
    # empCode  = models.CharField(max_length=100)
    # firstName  = models.CharField(max_length=100)
    # lastName  = models.CharField(max_length=100)
    # firstIn = models.DateTimeField()
    # lastOut = models.DateTimeField()
    # totalHours = models.CharField(max_length=100)
    # companyName = models.CharField(max_length=100)



    print(jsonredata['fileYear'], jsonredata['fileMonth'])

    allSingle = False
    # mymonth = datetime.datetime.strptime(data1[0]['FirstIn'], '%d-%B-%y %H:%M:%S').month
    mymonth =  jsonredata['fileMonth']
    for item in data1:
        # if(datetime.datetime.strptime(item['FirstIn'], '%d-%B-%y %H:%M:%S').month ==  monthToNum(jsonredata['fileMonth'])):
        if(datetime.datetime.strptime(item['FirstIn'], '%d-%B-%y %H:%M:%S').month ==  5):

            allSingle = True

    print(type(datetime.datetime.strptime(data1[0]['FirstIn'], '%d-%B-%y %H:%M:%S').month) , type(monthToNum(jsonredata['fileMonth'])))

    if(allSingle == True):
        print("yes every thing is true")

    # class AttendanceFile(models.Model):
    #     year = models.CharField(max_length=100)
    #     month = models.CharField(max_length=100)
    #     fileName = models.CharField(max_length=100)
    #     timeOfUpload = models.DateTimeField()
    #     hashofFile = models.CharField(max_length=200)
    #     fileBase64 = models.TextField()

    print(hashlib.md5(jsonredata['filebase64'].encode()).hexdigest())

    af = AttendanceFile(year=jsonredata['fileYear'],
                        month=jsonredata['fileMonth'],
                        fileName=jsonredata['fileName'],
                        timeOfUpload=jsonredata['fileUploadTime'],
                        hashofFile=hashlib.md5(jsonredata['filebase64'].encode()).hexdigest(),
                        fileBase64 = jsonredata['filebase64']
                        )
    af.save()

    myList  = []

    for item in data1:
        myList.append(
            Attendance(cardNo=item['cardno'],
                       workGroup=item['Workgroup'],
                       empCode=item['Empcode'],
                       firstName=item['Firstname'],
                       lastName=item['Lastname'],
                       firstIn=datetime.datetime.strptime(item['FirstIn'], '%d-%B-%y %H:%M:%S'),
                       lastOut=datetime.datetime.strptime(item['LastOut'], '%d-%B-%y %H:%M:%S'),
                       totalHours=item['TotalHours'],
                       companyName=item['CompanyNAme']
                       )
        )

    print(myList)

    #print(datetime.datetime.strptime(data1[0]['FirstIn'], '%d-%B-%y %H:%M:%S'))
    #Attendance.objects.bulk_create(myList)


    return HttpResponse(html)

# base64.decode(open('data/encoded.txt', 'r'), open('data/decoded.txt', 'w'))
