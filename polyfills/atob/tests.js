// atob

it("should throw exception for invalid characters in code", function () {
	expect(function() {
		var result = atob("YW55IGNhcm5hbCBwbGVhc3$VyZ");
	}).to.throwException();
});

it("should throw exception for shorter code", function () {
	expect(function() {
		var result = atob("YW55IGNhcm5hbCBwbGVhc3VyZ");
	}).to.throwException();
});

it("should throw exception for too much padding", function () {
	expect(function() {
		var result = atob("YW55IGNhcm5hbCBwbGVhc3VyZ===");
	}).to.throwException();
});

it("should decode valid code succesfully", function () {
	expect(atob("cGxlYXN1cmUu")).to.eql("pleasure.");
	expect(atob("bGVhc3VyZS4=")).to.eql("leasure.");
	expect(atob("ZWFzdXJlLg==")).to.eql("easure.");
	expect(atob("YXN1cmUu")).to.eql("asure.");
	expect(atob("c3VyZS4=")).to.eql("sure.");
});

it("should decode valid code without padding succesfully", function () {
	expect(atob("cGxlYXN1cmUu")).to.eql("pleasure.");
	expect(atob("bGVhc3VyZS4")).to.eql("leasure.");
	expect(atob("ZWFzdXJlLg")).to.eql("easure.");
	expect(atob("YXN1cmUu")).to.eql("asure.");
	expect(atob("c3VyZS4")).to.eql("sure.");
});
