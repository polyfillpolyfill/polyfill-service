
// HTMLInputElement.prototype.valueAsDate
(function (global) {
	if (!("HTMLInputElement" in global)) {
		return; /* browser too old */
	}

	var dateRegExp = /^\d{4,}-[0-1][0-9]-[0-3][0-9]$/;
	var monthRegExp = /^\d{4,}-[0-1][0-9]$/;
	var weekRegExp = /^\d{4,}-W[0-5][0-9]$/;
	var timeRegExp = /^[0-2][0-9]:[0-5][0-9]$/;

	var valueAsDateDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'valueAsDate');
	if (valueAsDateDescriptor && !valueAsDateDescriptor.configurable) {
		return; /* Safari < 10 doesn't allow overriding "HTMLInputElement.prototype.valueAsDate" */
	}

	function isLeapYear(year) {
		// A leap year is any year which is divisible by 400 or the year is divisible by 4 but not by 100.
		if ((year % 400) === 0) {
			return true;
		} else if ((year % 4) === 0 && (year % 100) !== 0) {
			return true
		}

		return false;
	}

	function daysInMonth(month, leap) {
		switch (month) {
			case 1	: /* January	31 */
				return 31;
			case 2: /* February	28 (29 in leap years) */
				if (leap) {
					return 29;
				}

				return 28;

			case 3	: /* March	31 */
				return 31;

			case 4	: /* April	30 */
				return 30;

			case 5	: /* May	31 */
				return 31;

			case 6	: /* June	30 */
				return 30;

			case 7	: /* July	31 */
				return 31;

			case 8	: /* August	31 */
				return 31;

			case 9	: /* September	30 */
				return 30;

			case 10	: /* October	31 */
				return 31;

			case 11	: /* November	30 */
				return 30;

			case 12	: /* December	31 */
				return 31;

			default:
				return -1;
		}
	}

		function dayInYear(year, month, day) {
			var monthLength = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
			if (isLeapYear(year)) {
				monthLength[2]++;
			}

			return monthLength[month] + day;
		}

	global.Object.defineProperty(global.HTMLInputElement.prototype, "valueAsDate", {
		enumerable: true,
		configurable: true,
		get: function() {
			if (this.value === "") {
				return null;
			}

			if (valueAsDateDescriptor && valueAsDateDescriptor.get) {
				// Do not break on future additions.
				try {
					var value = valueAsDateDescriptor.get.apply(this);
					if (value instanceof Date) {
						return value;
					}
				} catch (_) {
					/* noop */
				}
			}

			var type = this.type;
			if (type === "text") {
				// "type" property will be text even when setting the attribute to date|month|week|time in browsers without support
				type = this.getAttribute("type");
			}

			try {
				switch (type) {
					case "date":
						if (!dateRegExp.test(this.value)) {
							return null;
						}

						var date = this.value.split("-");

						var dYear = Number(date[0]);
						var dMonth = Number(date[1]);
						var dDay = Number(date[2]);
						if (dYear === 0 || dMonth === 0 || dDay === 0) {
							return null;
						}

						if (dMonth > 12) {
							return null;
						}

						if (dDay > daysInMonth(dMonth, isLeapYear(dYear))) {
							return null;
						}

						var dOut = new Date(Date.UTC(dYear, dMonth - 1, dDay));
						dOut.setUTCFullYear(dYear);
						return dOut;

					case "month":
						if (!monthRegExp.test(this.value)) {
							return null;
						}

						var month = this.value.split("-");

						var mYear = Number(month[0]);
						var mMonth = Number(month[1]);
						if (mYear === 0 || mMonth === 0) {
							return null;
						}

						if (mMonth > 12) {
							return null;
						}

						var mOut = new Date(Date.UTC(mYear, mMonth - 1));
						mOut.setUTCFullYear(mYear);
						return mOut;

					case "week":
						if (!weekRegExp.test(this.value)) {
							return null;
						}

						var week = this.value.split("-");

						var wYear = Number(week[0]);
						var wWeek = Number(week[1].slice(1));
						if (wYear === 0 || wWeek === 0) {
							return null;
						}

						if (wWeek > 53) {
							return null;
						}

						var yearHas53Weeks = false;
						var firstDayOfYear = new Date(Date.UTC(wYear, 0, 1, 0));
						firstDayOfYear.setUTCFullYear(wYear);
						firstDayOfYear.setUTCMonth(0);
						firstDayOfYear.setUTCDate(1);
						if (firstDayOfYear.getUTCDay() === 4) {
							// The first day of the calendar year (January 1) is a Thursday.
							yearHas53Weeks = true;
						} else if (isLeapYear(wYear) && firstDayOfYear.getUTCDay() === 3) {
							// The first day of the year (January 1) is a Wednesday and the year is a leap year.
							yearHas53Weeks = true;
						}

						if (!yearHas53Weeks && wWeek > 52) {
							return null;
						}

						var beforeOffset = new Date(Date.UTC(wYear, 0, 1 + (wWeek - 1) * 7));
						beforeOffset.setUTCFullYear(wYear);
						var dayOfWeek = beforeOffset.getUTCDay();
						var weekStart = new Date(beforeOffset);
						if (dayOfWeek <= 4) {
							weekStart.setUTCDate(beforeOffset.getUTCDate() - beforeOffset.getUTCDay() + 1);
						} else {
							weekStart.setUTCDate(beforeOffset.getUTCDate() + 8 - beforeOffset.getUTCDay());
						}

						return weekStart;

					case "time":
						if (!timeRegExp.test(this.value)) {
							return null;
						}

						var time = this.value.split(":");

						var tHour = Number(time[0]);
						var tMinute = Number(time[1]);

						if (tHour > 23) {
							return null;
						}
						if (tMinute > 59) {
							return null;
						}

						return new Date(Date.UTC(1970, 0, 1, tHour, tMinute));

					default:
						return null;
				}
			} catch (_) {
				return null;
			}
		},
		set: function (d) {
			var type = this.type;
			if (type === "text") {
				// "type" property will be text even when setting the attribute to date|month|week|time in browsers without support
				type = this.getAttribute("type");
			}

			switch (type) {
				case "date":
					if (d === null) {
						this.value = "";
						return;
					}

					try {
						var dYear = d.getUTCFullYear();
						var dMonth = ("0" + (d.getUTCMonth() + 1)).slice(-2);
						var dDay = ("0" + d.getUTCDate()).slice(-2);

						if (dYear < 1000) {
							dYear = ("0000" + dYear).slice(-4)
						}

						this.value = dYear + "-" + dMonth + "-" + dDay;
						return;
					} catch(_) {
						this.value = "";
						return;
					}

				case "month":
					if (d === null) {
						this.value = "";
						return;
					}

					try {
						var mYear = d.getUTCFullYear();
						var mMonth = ("0" + (d.getUTCMonth() + 1)).slice(-2);

						if (mYear < 1000) {
							mYear = ("0000" + mYear).slice(-4)
						}

						this.value = mYear + "-" + mMonth;
						return;
					} catch(_) {
						this.value = "";
						return;
					}

				case "week":
					if (d === null) {
						this.value = "";
						return;
					}

					try {
						var dd = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
						dd.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
						var weekNo = Math.ceil(dayInYear(dd.getUTCFullYear(), dd.getUTCMonth(), dd.getUTCDate()) / 7);
						var wYear = dd.getUTCFullYear();

						if (wYear < 1000) {
							wYear = ("0000" + wYear).slice(-4)
						}

						this.value = wYear + "-W" + ("0" + weekNo).slice(-2);
						return;
					} catch(_) {
						this.value = "";
						return;
					}


				case "time":
					if (d === null) {
						this.value = "";
						return;
					}

					try {
						var tHour = ("0" + d.getUTCHours()).slice(-2);
						var tMinute = ("0" + d.getUTCMinutes()).slice(-2);

						this.value = tHour + ":" + tMinute;
						return;
					} catch(_) {
						this.value = "";
						return;
					}

				default:
					// Do not break on future additions.
					if (valueAsDateDescriptor && valueAsDateDescriptor.set) {
						valueAsDateDescriptor.set.apply(this, d);
					}
			}
		}
	});
}(self));
