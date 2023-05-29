import sys
import os
import shutil
import time

##		sys.arg[1]	-->		name of cloud
##		sys.arg[2]	-->		way of implementation
##		sys.arg[3]	-->		architecture number
##		sys.arg[4]	-->		test type
##		sys.arg[5]	-->		test title
##		sys.arg[6]	-->		number of tests
##		sys.arg[7]	-->		time interval between tests [s]

def test(path: str, test_number: int):
	print("-----------------------------------------------------------------------")
	print(f"                                Test #{test_number}")
	print("-----------------------------------------------------------------------")

	results_path = fr"{path}\test_#{test_number}"
	if not os.path.exists(results_path):
		os.makedirs(results_path)

	command = fr"k6 run --summary-export={results_path}\summary_test.json --out json={results_path}\results_test.json stress.js"
	os.system(command)

	print("-----------------------------------------------------------------------")
	print(f"                           Test #{test_number} completed")
	print("-----------------------------------------------------------------------")	


if __name__ == "__main__":
	cloud = 'aws'
	implementation = 'serverless'
	architecture = 1
	test_type = 'stress'
	number_of_tests = 10
	interval_time = 60 * 5
	test_title = f'GET-{number_of_tests}-{interval_time}-1000-30'
#	cloud = sys.argv[1]
#	implementation = sys.argv[2]
#	architecture = sys.argv[3]
#	test_type = sys.argv[4]
#	number_of_tests = sys.arg[5]
#	interval_time = sys.arg[6]
#	test_title = sys.arg[7]

	main_path = os.getcwd()
	architecture_path = os.path.join(main_path, f"{cloud}-{implementation}-{architecture}")
	if not os.path.exists(architecture_path):
		os.makedirs(architecture_path)
	test_type_path = os.path.join(architecture_path, f"{test_type}_test")
	if not os.path.exists(test_type_path):
		os.makedirs(test_type_path)
	path = os.path.join(test_type_path, f"{test_title}")
	if not os.path.exists(path):
		os.makedirs(path)

	for i in range(1, number_of_tests + 1):
		test(path = path, test_number = i)
		if i != number_of_tests:
			time.sleep(interval_time)

	shutil.copyfile(f"{test_type}.js", f"{path}\{test_type}_backup.js")

	print("-----------------------------------------------------------------------")
	print("                            Tests completed                            ")
	print("-----------------------------------------------------------------------")

