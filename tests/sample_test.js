import http from "k6/http";
import { sleep } from "k6";
export let options = {
  insecureSkipVerify: true,
  noConnectionReuse: false,
  vus: 1,
  duration: "10s",
};

export default () => {
  http.get(
    "" // url to hit
  );
  sleep(1);
};
