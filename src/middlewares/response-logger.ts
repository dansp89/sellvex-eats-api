const redirectMiddleware = (config, { strapi }) => {
    return async (ctx, next) => {
        console.log(ctx.request.url);
        console.log(ctx.response.body);
        await next();
    };
};

export default redirectMiddleware