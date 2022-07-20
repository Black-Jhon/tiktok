import createSchema from "part:@sanity/base/schema-creator";

import schemaTypes from "all:part:@sanity/base/schema-type";
import postedBy from "./postedBy";
import comment from "./comment";
import post from "./post";
import user from "./user";

export default createSchema({
    name: "default",
    types: schemaTypes.concat([
        post, postedBy, user, comment
    ]),
});
