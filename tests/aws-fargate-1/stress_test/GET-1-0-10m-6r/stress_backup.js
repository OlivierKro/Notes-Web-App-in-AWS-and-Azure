import http from 'k6/http';
import { check, sleep, data } from 'k6';

export const options = {
	discardResponseBodies: true,
	scenarios: {
	  contacts: {
		exec: 'getNotes',
		executor: 'constant-arrival-rate',
		duration: '10m',
		timeUnit: '1s',
		rate: 6,
		preAllocatedVUs: 6,
		maxVUs: 1000
	  },
	},
};

export function getNotes () {
	let headers = {
		'app_user_name': 'Test_user',
		'Content-Type': 'application/json'
	};
	const res = http.get('http://3.68.221.34/notes', { headers: headers });
//	const res = http.get('https://notes-webapp.lemonflower-c4cb3782.germanywestcentral.azurecontainerapps.io/notes', { headers: headers });
//	const res = http.get('https://notes-web-app.azurewebsites.net/api/notes', { headers: headers });
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
	const res = http.post('https://2pkvb43g77.execute-api.eu-central-1.amazonaws.com/prod/note', JSON.stringify(body), { headers: headers });
//	const res = http.post('http://3.68.221.34/note', JSON.stringify(body), { headers: headers });
//	const res = http.post('https://notes-webapp.lemonflower-c4cb3782.germanywestcentral.azurecontainerapps.io/note', JSON.stringify(body), { headers: headers });
//	const res = http.post('https://notes-web-app.azurewebsites.net/api/note', JSON.stringify(body), { headers: headers });
	check(res, { 'status was 200': (r) => r.status == 200 });
	sleep(1);
}