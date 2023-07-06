import http from 'k6/http';
import { check, sleep, data } from 'k6';

export const options = {
	discardResponseBodies: true,
	scenarios: {
	  contacts: {
		exec: 'addNote',
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

export function getNotes () {
	let headers = {
		'app_user_name': 'Test_user',
		'Content-Type': 'application/json'
	};
//	const res = http.get('http://3.68.221.34/notes', { headers: headers });
	const res = http.get('https://notes-webapp.lemonflower-c4cb3782.germanywestcentral.azurecontainerapps.io/notes', { headers: headers });
	check(res, { 'status was 200': (r) => r.status == 200 });
	sleep(1);
}

export function addNote () {
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
	const res = http.post('http://3.68.221.34/note', JSON.stringify(body), { headers: headers });
//	const res = http.post('https://notes-webapp.lemonflower-c4cb3782.germanywestcentral.azurecontainerapps.io/note', JSON.stringify(body), { headers: headers });
 	check(res, { 'status was 200': (r) => r.status == 200 });
	sleep(1);
}