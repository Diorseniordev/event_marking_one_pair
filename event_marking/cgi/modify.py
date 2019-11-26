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
        "%s_event_marking.txt" % (id))]
    lineList = [line.rstrip('\n') for line in open(
        "%s_slideshow_2.txt" % (id))]
    for item in eventList[1:]:
        item = item.split('\t')
        tempEventList.append(item)
    for item in lineList:
        item = item.split('\t')

        if len(item) == 6:
            item.append('-1')
            item.append('-1')
            item.append('-1')
            item.append('-1')

        tempSlideList.append(item)

    updateStatus(id)


def updateStatus(id):

    frame = -5

    f = open("%s_slideshow_2.txt" % (id), "w")
    # print("%s_slideshow_2.log" % (id))
    for item in tempSlideList:
        frame += 1
        if item[5] == '1' and frame > 0:

            item[6], item[7], item[8], item[9] = checkMarking(frame)
        f.write("\t".join(str(x)
                          for x in item) + "\n")
    f.close()


def checkMarking(num):
    scount = 0
    ecount = 0
    mcount = 0
    avglen = 0
    for item in tempEventList:

        startf = int(item[4])
        endf = int(item[5])
        # if frame appears in start point increase scount by 1
        # if frame appears in end point increase ecount by 1
        # if frame appears between start and end point increase mcount by 1

        if num == startf:
            scount += 1
            avglen += endf - startf + 1
        if num == endf:
            ecount += 1
            avglen += endf - startf + 1
        if num < endf and num > startf:
            mcount += 1
            avglen += endf - startf + 1
    if scount + mcount + ecount != 0:
        avglen = '%.4f' % (float(avglen) / (scount + mcount + ecount))
    else:
        avglen = '0.0000'
    return scount, ecount, mcount, avglen
