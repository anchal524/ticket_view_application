const ticket = require('./ticket');

test('validate numeric throws for non numeric values', () => {
    expect( () => {ticket.validateNumericParams("a", "Id")}).toThrow();
});

test('validate numeric does not throw for numeric values', () => {
    expect( () => {ticket.validateNumericParams("1", "Id")}).not.toThrow();
});

test('validate numeric does not throws for empty values', () => {
    expect( () => {ticket.validateNumericParams("", "Id")}).toThrow();
});


test('validate query params parsing', () => {
    let url = "https://zccstudents2346.zendesk.com/api/v2/tickets?page%5Bafter%5D=eyJvIjoibmljZV9pZCIsInYiOiJhUmtBQUFBQUFBQUEifQ%3D%3D&page%5Bsize%5D=25"
    expect (ticket.getPageQueryParam(url)["page[size]"]).toBe("25");
    expect (ticket.getPageQueryParam(url)["page[after]"]).toBe("eyJvIjoibmljZV9pZCIsInYiOiJhUmtBQUFBQUFBQUEifQ%3D%3D");
});
