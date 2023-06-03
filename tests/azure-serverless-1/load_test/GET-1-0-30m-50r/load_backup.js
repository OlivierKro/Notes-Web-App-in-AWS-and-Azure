import http from 'k6/http';
import { check, sleep, data } from 'k6';

export const options = {
	discardResponseBodies: true,
	scenarios: {
	  contacts: {
		executor: 'constant-arrival-rate',
		duration: '30m',
		timeUnit: '1s',
		rate: 50,
		preAllocatedVUs: 50,
		maxVUs: 100
	  },
	},
};

export default function () {
	let headers = {
		'app_user_name': 'Test_user',
		'Content-Type': 'application/json'
	};
	const res = http.get('https://notes-web-app.azurewebsites.net/api/notes', { headers: headers });
	check(res, { 'status was 200': (r) => r.status == 200 });
	sleep(1);
}


