#!C:\Program Files (x86)\Microsoft Visual Studio\Shared\Python37_64\python.exe
import os
import sys
import json

# Read request content
# content_length = int(os.environ["CONTENT_LENGTH"])
# request_body = sys.stdin.read(content_length)
# json_data = json.loads(request_body)

# Headers
# SLIDESHOW_HEADERS = ["movie", "onset_call", "requested_onset", "rt", "status"]

# EVENT_MARKING_HEADERS = ["movie", "trial", "first_id",
#                          "second_id", "first_frame", "second_frame"]

# Check if parameters have been supplied

# print('Content-type: text/plain; charset=UTF-8\n\n')
# print('Content-type: application/json; charset=UTF-8\n\n')
# print(json.dumps(result))

tempEventList = []
tempSlideList = []


def updateReady(id):

    eventList = [line.rstrip('\n') for line in open(
        "%s_event_marking.log" % (id))]
    lineList = [line.rstrip('\n') for line in open(
        "%s_slideshow_2.log" % (id))]
    for item in eventList[1:]:
        item = item.split('\t')
        tempEventList.append(item)
    for item in lineList:
        item = item.split('\t')
        tempSlideList.append(item)

    updateStatus(id)


def updateStatus(id):

    frame = -4

    f = open("%s_slideshow_2.log" % (id), "w")
    # print("%s_slideshow_2.log" % (id))
    for item in tempSlideList:
        frame += 1
        if item[len(item)-1] == '0' and frame > 0:

            item[4] = checkMarking(frame)
        f.write("\t".join(str(x)
                          for x in item) + "\n")

    f.close()


def checkMarking(num):
    flag = 0
    for item in tempEventList:
        startf = int(item[4])
        endf = int(item[5])
        # only marked in start: 1
        # only marked in end: 2
        # only marked between start and end: 3
        # marked in start and end: 5
        # marked in start and between pair: 6
        # marked in end and between pari: 7
        # marked in start, end, between pair: 8
        # not marked: 4
        #
        if flag == 0:
            if num == startf:
                flag = 1
            elif num == endf:
                flag = 2
            elif num < endf and num > startf:
                flag = 3
        elif flag == 1:
            if num == endf:
                flag = 5
            elif num < endf and num > startf:
                flag = 6
        elif flag == 2:
            if num == startf:
                flag = 5
            elif num < endf and num > startf:
                flag = 7
        elif flag == 3:
            if num == startf:
                flag = 6
            elif num == endf:
                flag = 7
        elif flag == 5:
            if num < endf and num > startf:
                flag = 8
        elif flag == 6:
            if num == endf:
                flag = 8
        elif flag == 7:
            if num == startf:
                flag = 8
    if flag == 0:
        flag = 4
    return flag


# updateReady("A3242352352352")
