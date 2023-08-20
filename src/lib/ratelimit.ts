import { delay } from './base';

class Ratelimit {
  amount: number;
  time_interval_in_ms: number;
  slots: number[];
  constructor(amount: number, time_interval_in_seconds: number) {
    this.amount = amount;
    this.time_interval_in_ms = time_interval_in_seconds * 1000;
    this.slots = Array(amount).fill(0);
  }
  async wait_for_turn(): Promise<void> {
    var oldest_time = this.slots.shift()!;
    var time_now = new Date().getTime();
    var new_time =
      oldest_time + this.time_interval_in_ms > time_now ? oldest_time + this.time_interval_in_ms : time_now;
    this.slots.push(new_time);
    if (new_time !== time_now) {
      console.log('Ratelimited, wait for', new_time - time_now, ' ms');
      await delay((new_time - time_now) / 1000);
      console.log('release');
    }
    return;
  }
}
const globalForRatelimitSmall = global as unknown as { ratelimitSmall: Ratelimit };
export const ratelimitSmall =
  globalForRatelimitSmall.ratelimitSmall ||
  new Ratelimit(Number(process.env.RATELIMIT_SMALL_AMOUNT), Number(process.env.RATELIMIT_SMALL_DURATION_IN_SECONDS));
if (process.env.NODE_ENV !== 'production') globalForRatelimitSmall.ratelimitSmall = ratelimitSmall;

const globalForRatelimitLarge = global as unknown as { ratelimitLarge: Ratelimit };
export const ratelimitLarge =
  globalForRatelimitLarge.ratelimitLarge ||
  new Ratelimit(Number(process.env.RATELIMIT_LARGE_AMOUNT), Number(process.env.RATELIMIT_LARGE_DURATION_IN_SECONDS));
if (process.env.NODE_ENV !== 'production') globalForRatelimitLarge.ratelimitLarge = ratelimitLarge;
