const checkValidationSchema =  (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(
                { ...req.body, ...req.files },
                {
                    allowUnknown: true,
                    abortEarly: false,
                }
            );
            next();
        } catch (err) {
            console.log(err.details);
            return res.status(400).send({
                msg: "Validation Error",
                errors: err.details.map((el) => {
                    return {
                        field: el.context.key,
                        msg: el.message,
                    };
                }),
            });
        }

    }
};

module.exports = {
    checkValidationSchema
}