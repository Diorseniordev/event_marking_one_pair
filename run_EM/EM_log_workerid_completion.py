#!C:\Program Files (x86)\Microsoft Visual Studio\Shared\Python37_64\python.exe

import time
import os.path
import datetime
import cgitb
import cgi
import sys
worker_db_fname = 'EM_completed_worker_log.txt'
# file format: tab-delimited text
# fields: worker id, timestamp of completion, completion code
# doing this the ghetto way for now
lockfile_fname = 'EM_completed_worker_log_lockfile'


cgitb.enable(display=0, logdir="pylogs")

formdata = cgi.FieldStorage()

workerid = formdata.getvalue("workerid",      "WORKERID_NULL")
comp_code = formdata.getvalue("comp_code",     "COMPCODE_NULL")
block_order_condition = formdata.getvalue(
    "block_order_condition",     "BLOCK_ORDER_CONDITION_NULL")

sys.stdout.write('Content-type: text/plain; charset=UTF-8\n\n')

timestamp_str = '{0}'.format(datetime.datetime.utcnow())
line_to_print = '{0}\t{1}\t{2}\t{3}\n'.format(
    workerid, timestamp_str, comp_code, block_order_condition)

# check lock status
try_count = 0
lockfile_exists = os.path.isfile(lockfile_fname)
while lockfile_exists:
    time.sleep(0.2)
    try_count += 1
    if try_count > 10:
        sys.stdout.write('error')
        sys.exit()
    lockfile_exists = os.path.isfile(lockfile_fname)

open(lockfile_fname, 'a').close()  # creates lockfile and immediately closes it

try:
    filehandle = open(worker_db_fname, 'a')
    filehandle.write(line_to_print)
    filehandle.close()
    os.remove(lockfile_fname)
except:
    sys.stdout.write('error')
    os.remove(lockfile_fname)
    filehandle.close()
    sys.exit()

if (workerid == "WORKERID_NULL") or (workerid == ""):
    sys.stdout.write('error')
else:
    sys.stdout.write('success')
