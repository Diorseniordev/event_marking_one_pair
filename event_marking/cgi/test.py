#!C:\Program Files (x86)\Microsoft Visual Studio\Shared\Python37_64\python.exe
import os
import sys
import json
import modify
# Read request content
content_length = int(os.environ["CONTENT_LENGTH"])
request_body = sys.stdin.read(content_length)
json_data = json.loads(request_body)

# Headers
SLIDESHOW_HEADERS = ["filePath", "onset_call", "requested_onset",
                     "rt  ", "fullscreen", "start", "end", "middle", "avglength"]

EVENT_MARKING_HEADERS = ["filePath", "trial", "first_id",
                         "second_id", "first_frame", "second_frame"]

# Check if parameters have been supplied
if 'turkID' in json_data:
    if 'data_type' in json_data:
        if 'demographics' in json_data:
            pass

        elif 'slideshow' in json_data['data_type']:
            f = open('%s_%s.txt' %
                     (json_data['turkID'], json_data['data_type']), 'w')
            if json_data['data_type'] == "slideshow_1":
                f.write(" \t".join(SLIDESHOW_HEADERS) + "\n")
            else:
                f.write(" \t".join(SLIDESHOW_HEADERS) + "\n")
            for row in json_data['data_content']:
                f.write("\t".join([str(row[str(c).rstrip()])
                                   for c in SLIDESHOW_HEADERS[:5]]) + "\n")

            f.close()

            result = {'success': 'true',
                      'message': 'The command completed successfully', 'json': json_data}

        elif 'recollection' in json_data['data_type']:
            f = open('%s_%s.txt' %
                     (json_data['turkID'], json_data['data_type']), 'w')
            f.write(str(json_data['data_content']))
            f.close()

            result = {'success': 'true',
                      'message': 'The command completed successfully', 'json': json_data}

        elif 'event_marking' in json_data['data_type']:
            f = open('%s_%s.txt' %
                     (json_data['turkID'], json_data['data_type']), 'w')

            f.write(" \t".join(EVENT_MARKING_HEADERS) + "\n")
            for row in json_data['data_content']:
                f.write(" \t".join([str(row[str(c).rstrip()])
                                    for c in EVENT_MARKING_HEADERS]) + "\n")
            f.close()
            modify.updateReady(json_data['turkID'])
            result = {'success': 'true',
                      'message': 'The command completed successfully', 'json': json_data}

        else:
            result = {'success': 'false',
                      'message': 'Invalid data type', 'json': json_data}
    else:
        result = {'success': 'false',
                  'message': 'No data type detected', 'json': json_data}
else:
    result = {'success': 'false',
              'message': 'Invalid mTurk ID', 'json': json_data}

# print('Content-type: text/plain; charset=UTF-8\n\n')

print('Content-type: application/json; charset=UTF-8\n\n')
print(json.dumps(result))
