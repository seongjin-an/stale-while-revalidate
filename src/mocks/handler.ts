import {rest} from "msw";
export const handlers = [
    rest.get('/api/user/:userId', async (req, res, ctx) => {
        const { userId } = req.params;
        return res(
            ctx.json({
                name: `jimmy (${userId})`
            })
        )
        // return res(ctx.status(400))
    }),
    rest.get('/api/users', async (req, res, ctx) => {
        const pageIndex = req.url.searchParams.get('page')

        return res(
            ctx.json([
                {
                    id: `1 ${pageIndex}`,
                    name: `jimmy 1-${pageIndex}`,
                },
                {
                    id: `2 ${pageIndex}`,
                    name: `jimmy 2-${pageIndex}`,
                },
                {
                    id: `3 ${pageIndex}`,
                    name: `jimmy 3-${pageIndex}`,
                },
                {
                    id: `4 ${pageIndex}`,
                    name: `jimmy 4-${pageIndex}`,
                },
                {
                    id: `5 ${pageIndex}`,
                    name: `jimmy 5-${pageIndex}`,
                },
            ])
        )
        // return res(ctx.status(400))
    }),
]