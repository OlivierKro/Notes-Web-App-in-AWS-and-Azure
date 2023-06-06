import http from 'k6/http';
import { check, sleep, data } from 'k6';

export const options = {
	discardResponseBodies: true,
	scenarios: {
	  contacts: {
		executor: 'constant-arrival-rate',
		duration: '10m',
		timeUnit: '1s',
		rate: 125,
		preAllocatedVUs: 125,
		maxVUs: 150
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