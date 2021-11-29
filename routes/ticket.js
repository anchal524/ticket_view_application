const express = require("express");
const router = express.Router();
const tickets = require("../data/tickets");

function validateNumericParams(param, paramName) {
    if (!param) {
        throw `No ${paramName} passed `;
    } else if (param.length === 0) {
        throw `No ${paramName} provided`;
    } else if (String(parseInt(param)) !== param) {
        throw `'${param}' is not a numeric ${paramName}`;
    }
}

function getPageQueryParam(url) {
    let params = {};
    tokens = url.split(/[?=&]/);
    for (let i = 1; i < tokens.length; i++) {
        params[decodeURIComponent(tokens[i])] =
            i + 1 < tokens.length ? tokens[i + 1] : "";
    }
    return params;
}

router.get("/", async (req, res) => {
    try {
        const ticktsCount = await tickets.getTicketsCount();
        const urlParams = getPageQueryParam(req.url);
        const ticketsData = await tickets.getTicketsData(urlParams);
        let prev = getPageQueryParam(ticketsData.links.prev);
        let next = getPageQueryParam(ticketsData.links.next);
        const pageSize = 25;
        let firstId = ticketsData.tickets[0].id;
        let lastId = ticketsData.tickets[ticketsData.tickets.length - 1].id;
        res.render("tickets/index", {
            title: "Tickets",
            ticket: ticketsData.tickets,
            pageSize: pageSize,
            ticketsTotalCount: ticktsCount.count.value,
            firstId: firstId,
            lastId: lastId,
            nextPage: decodeURIComponent(
                next && next["page[after]"] ? next["page[after]"] : ""
            ),
            prevPage: decodeURIComponent(
                prev && prev["page[before]"] ? prev["page[before]"] : ""
            ),
        });
    } catch (e) {
        res.render("tickets/error", {
            title:
                e.response && e.response.statusText
                    ? e.response.statusText
                    : "",
            httpStatusCode:
                e.response && e.response.status ? e.response.status : 500,
            httpErrorName:
                e.response && e.response.statusText
                    ? e.response.statusText
                    : "Something went wrong",
            errorMessage:
                e.response && e.response.data && e.response.data.description
                    ? e.response.data.description
                    : "",
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        validateNumericParams(req.params.id, "Id");
    } catch (e) {
        res.render("tickets/error", {
            title: "Error",
            httpStatusCode: "400",
            errorMessage: e,
        });
        return;
    }
    try {
        const ticketById = await tickets.getTicketsDatabyId(req.params.id);
        res.render("tickets/ticketdetails", {
            title: "Ticket" + req.params.id,
            ticket: ticketById.ticket,
        });
    } catch (e) {
        let errorMessage =
            e.response && e.response.data && e.response.data.description
                ? e.response.data.description
                : "";
        if (e.response.status === 404) {
            errorMessage = `No ticket found with id ${req.params.id}`;
        }
        res.render("tickets/error", {
            title:
                e.response && e.response.statusText
                    ? e.response.statusText
                    : "",
            httpStatusCode:
                e.response && e.response.status ? e.response.status : 500,
            httpErrorName:
                e.response && e.response.statusText
                    ? e.response.statusText
                    : "Something went wrong",
            errorMessage: errorMessage,
        });
    }
});

module.exports = {
    router: router,
    validateNumericParams: validateNumericParams,
    getPageQueryParam: getPageQueryParam,
};
