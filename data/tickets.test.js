const ticket = require('./tickets');

test('validate total ticket counts', () => {
    return ticket.getTicketsCount().then(data => {
        expect(data["count"]["value"]).not.toBe(0);
    });
});

test('should throw for invalid id', async () =>  {        
    await expect(ticket.getTicketsDatabyId('a'))
    .rejects
    .toThrow();
});

test('returns ticket details for valid id',  () =>  {        
    return ticket.getTicketsDatabyId(1).then(data => {
        expect(data["ticket"]["id"]).toBe(1);
    });
});

test('returns tickets data',  () =>  {        
    return ticket.getTicketsData().then(data => {
        const pageSize = 25
        expect(data["tickets"].length).toBe(pageSize);
    });
});

test('should throw for invalid page[after]', async () =>  {        
    await expect(ticket.getTicketsData({"pageSize":25,"page[after]":1}))
    .rejects
    .toThrow();
});
