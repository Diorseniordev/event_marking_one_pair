#!C:\Program Files (x86)\Microsoft Visual Studio\Shared\Python37_64\python.exe

worker_db_fname = 'EM_completed_worker_log.txt'
# file format: tab-delimited text
# fields: worker id, timestamp of completion, completion code

import sys, cgi, cgitb, os.path

cgitb.enable(display=0, logdir="pylogs")

formdata = cgi.FieldStorage()

workerid     = formdata.getvalue("workerid",      "WORKERID_NULL")

sys.stdout.write('Content-type: text/plain; charset=UTF-8\n\n')
if (workerid == "WORKERID_NULL") or (workerid == ""):
    sys.stdout.write('error')
    sys.exit()

if (not os.path.isfile( worker_db_fname )):
    sys.stdout.write('unused')
    sys.exit()

try:
    filehandle = open(worker_db_fname, 'r')
    all_lines = filehandle.readlines()
    filehandle.close()
except:
    sys.stdout.write('error')
    sys.exit()

for this_line in all_lines:
    this_line = this_line.strip( '\n' )
    this_line_cells = this_line.split( '\t' )
    this_workerid = this_line_cells[0]
    if (workerid == this_workerid):
        sys.stdout.write('used')
        sys.exit()

sys.stdout.write('unused')
