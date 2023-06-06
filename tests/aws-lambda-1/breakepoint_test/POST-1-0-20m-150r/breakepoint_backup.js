import http from 'k6/http';
import { check, sleep, data } from 'k6';

export const options = {
	discardResponseBodies: true,
	scenarios: {
	  contacts: {
		executor: 'ramping-arrival-rate',
		startRate: 0,
		timeUnit: '1s',
		preAllocatedVUs: 0,
		maxVUs: 1000,
		stages: [
			{ target: 150, duration: '20m' },
		]
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
	const res = http.post('https://2pkvb43g77.execute-api.eu-central-1.amazonaws.com/prod/note', JSON.stringify(body), { headers: headers });
	check(res, { 'status was 200': (r) => r.status == 200 });
	sleep(1);
}