#!C:\Program Files (x86)\Microsoft Visual Studio\Shared\Python37_64\python.exe
import os
import sys
import json

# Read request content
content_length = int(os.environ["CONTENT_LENGTH"])
request_body = sys.stdin.read(content_length)
json_data = json.loads(request_body)

# Headers
# SLIDESHOW_HEADERS = ["movie", "onset_call", "requested_onset", "rt", "status"]

# EVENT_MARKING_HEADERS = ["movie", "trial", "first_id",
#                          "second_id", "first_frame", "second_frame"]

# Check if parameters have been supplied

# print('Content-type: text/plain; charset=UTF-8\n\n')

tempEventList = []
tempSlideList = []
turkID = json_data['turkID']

eventList = [line.rstrip('\n') for line in open(
    "%s_event_marking.log" % (turkID))]
lineList = [line.rstrip('\n') for line in open(
    "%s_slideshow_2.log" % (turkID))]
for item in eventList[1:]:
    item = item.split('\t')
    tempEventList.append(item)
for item in lineList:
    item = item.split('\t')
    tempSlideList.append(item)


frame = 0
f = open("%s_slideshow_2.log" % (turkID), "w")
# print("%s_slideshow_2.log" % (turkID))
for item in tempSlideList:
    frame += 1
    if item[len(item)-1] == '0':
        flag = 0
        for item in tempEventList:
            startf = int(item[4])
            endf = int(item[5])
            if frame == startf and flag == 0:
                flag = 1
            elif frame == endf and flag == 0:
                flag = 2
            elif frame > startf and frame < endf and flag == 0:
                flag = 3
        if flag == 0:
            flag = 4
        item[4] = flag
    f.write("\t".join(str(x)
                      for x in item) + "\n")

f.close()


result = {'success': 'true',
          'message': 'The command completed successfully', 'json': json_data}
# updateReady("A3242352352352")
print('Content-type: application/json; charset=UTF-8\n\n')
print(json.dumps(result))
