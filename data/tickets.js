const axios = require("axios");
const base64 = require("base-64");
const username = process.env.USERNAME_ZENDESK;
const password = process.env.PASSWORD;
const stringToHash = `${username}:${password}`;
const hash = base64.encode(stringToHash);
const baseUrl = "https://zccstudents2346.zendesk.com/api/v2/tickets";
const Basic = "Basic " + hash;

async function getTicketsData(urlParams) {
    const pageAfter =
        urlParams && urlParams["page[after]"] ? urlParams["page[after]"] : "";
    const pageBefore =
        urlParams && urlParams["page[before]"] ? urlParams["page[before]"] : "";
    const numRowsPerPage = 25;
    let url = "";
    if (pageAfter && pageAfter != "") {
        url =
            baseUrl +
            `?` +
            `page[after]=${pageAfter}` +
            `&page[size]=${numRowsPerPage}`;
    } else if (pageBefore && pageBefore != "") {
        url =
            baseUrl +
            `?` +
            `page[before]=${pageBefore}` +
            `&page[size]=${numRowsPerPage}`;
    } else {
        url = baseUrl + `?page[size]=${numRowsPerPage}`;
    }
    let {data} = await axios.get(url, {headers: {Authorization: Basic}});
    if (!data || data.tickets.length === 0) {
        throw {
            response: {
                status: 404,
                statusText: "no tickets found",
            },
        };
    }
    return data;
}

async function getTicketsCount() {
    let {data} = await axios.get(
        "https://zccstudents2346.zendesk.com/api/v2/tickets/count",
        {headers: {Authorization: Basic}}
    );
    return data;
}

async function getTicketsDatabyId(ticketId) {
    const url = baseUrl + "/" + ticketId;
    let {data} = await axios.get(url, {headers: {Authorization: Basic}});
    return data;
}

module.exports = {getTicketsData, getTicketsDatabyId, getTicketsCount};
