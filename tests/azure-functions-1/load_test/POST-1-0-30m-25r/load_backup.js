import http from 'k6/http';
import { check, sleep, data } from 'k6';

export const options = {
	discardResponseBodies: true,
	scenarios: {
	  contacts: {
		executor: 'constant-arrival-rate',
		duration: '30m',
		timeUnit: '1s',
		rate: 25,
		preAllocatedVUs: 25,
		maxVUs: 50
	  },
	},
};

export default function () {
	let headers = {
		'app_user_name': 'Test_user',
		'Content-Type': 'application/json'
	};
	let body = {
		"Item": {
			"title": "Test title",
			"category": "Stress tests",
			"description": "Stress test on cloud",
		}
	};
	const res = http.post('https://notes-web-app.azurewebsites.net/api/note', JSON.stringify(body), { headers: headers });
	check(res, { 'status was 200': (r) => r.status == 200 });
	sleep(1);
}

