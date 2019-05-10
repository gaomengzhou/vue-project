var express = require("express");

var router = express.Router();

var {
    conn,
    setError,
    aesEncrypt,
    keys
} = require("./utils");
var {
    waterfall
} = require("async");

var {
    ObjectID
} = require("mongodb");

router.get("/index", (req, res) => {
    res.json({
        msg: "这是vue 项目的接口模块 "
    })
})


//注册
router.post("/register", (req, res) => {
    var body = req.body;
    console.log(body)
    conn((err, db) => {
        if (err) {
            res.json({
                errMsg: "数据库错误",
                code: 500
            })
            db.close();
            throw err;
        } else {
            var users = db.collection("users");
            waterfall([
                (callback) => {
                    users.findOne({
                        username: body.username
                    }, {}, (err, result) => {
                        if (err) {
                            callback(err, null);
                        } else {
                            callback(null, result);
                        }
                    });
                },
                (arg, callback) => {
                    if (arg) {
                        callback(null, {
                            msg: "用户名已存在",
                            code: 200,
                            type: "1"
                        })
                    } else {
                        body.enterTime = new Date();
                        users.insert(body, (err, result) => {
                            console.log(result)
                            if (err) {
                                callback(err, null);
                            } else {
                                callback(null, {
                                    msg: "注册成功",
                                    code: 200,
                                    type: "0"
                                })
                            }
                        })
                    }
                }
            ], function (err, result) {
                if (err) {
                    res.json({
                        errMsg: "数据错误",
                        code: 500,
                        type: "3"
                    })
                    db.close();
                    throw err;
                } else {
                    if (result.type == "1") {
                        res.send(`${result.type}`);
                    } else {
                        res.send(`${result.type}`);
                    }
                    db.close();
                }
            })
        }
    })
})




router.post("/login", (req, res) => {
    var body = req.body;

    console.log(body);
    conn((err, db) => {
        setError(err, res, db);
        var findData = function (db, callback) {
            db.collection("users").findOne(body, {}, (err, result) => {
                console.log(result);
                setError(err, res, db);
                callback(result);
            });
        }

        findData(db, (result) => {
            console.log(result);
            if (result) {
                console.log("成功")
                res.json({
                    msg: "登录成功",
                    code: 200,
                    result,
                })
            } else {
                console.log("失败")
                res.json({
                    msg: "登录失败",
                    code: 500,
                    result,
                })
            }
            db.close();
        })


    })

})






// 得到所有的商品 
router.get("/getGoodList", (req, res) => {
    var limit = req.query.limit * 1 || 0;
    conn((err, db) => {
        setError(err, res, db);
        db.collection("goods").find({}, {}).sort({
            _id: -1
        }).limit(limit).toArray((err, result) => {
            setError(err, res, db);
            res.json({
                msg: "获取商品成功",
                code: 200,
                result
            });
            db.close()
        })
    })
})

// 获取商品分类
router.get("/getGoodTypes", (req, res) => {
    conn((err, db) => {
        setError(err, res, db);
        db.collection("goods").distinct("type", (err, result) => {
            setError(err, res, db);
            res.json({
                msg: "获取商品分类成功",
                code: 200,
                result
            });
            db.close()
        })
    })
})

// 根据商品 _id 获取 单条商品所有信息
router.get("/getGoodOne", (req, res) => {
    var _id = req.query._id || "";
    console.log(_id);
    conn((err, db) => {
        setError(err, res, db);
        db.collection("goods").findOne({
            _id: ObjectID(_id)
        }, (err, result) => {
            setError(err, res, db);
            res.json({
                msg: "获取单条商品成功",
                code: 200,
                result
            });
            db.close()
        })
    })
})

// 搜索商品 name  keyword
router.get("/search", (req, res) => {
    var keyword = req.query.keyword;
    conn((err, db) => {
        setError(err, res, db);
        db.collection("goods").find({
            title: new RegExp(keyword)
        }, {}).toArray((err, result) => {
            setError(err, res, db);
            res.json({
                msg: "搜索商品成功",
                code: 200,
                result
            });
            db.close()

        })
    })
})

//添加进购物车
router.get("/shopingcar", (req, res) => {
    var goodsid = req.query.goodsid;
    var username = req.query.username;
    var goodsnum = req.query.goodsnum * 1;
    var query = req.query;
    query.goodsnum = query.goodsnum * 1;
    console.log(query)
    conn((err, db) => {
        setError(err, res, db)
        waterfall([
            (callback) => {
                //判断用户是否已经添加过此商品
                db.collection("shopingcar").findOne({
                    goodsid,
                    username
                }, {}, (err, result) => {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, result)
                    }
                })
            }, (goods, callback) => {
                if (goods) {
                    db.collection("shopingcar").update({
                        goodsid,
                        username
                    }, {
                        $inc: {
                            goodsnum
                        }
                    }, (err, result) => {
                        if (err) {
                            callback(err, null)
                        } else {
                            callback(null, {
                                msg: "添加成功",
                                code: 200,
                                type: 1
                            })
                        }
                    })
                } else {
                    db.collection("shopingcar").insert(query, (err, result) => {
                        if (err) {
                            callback(err, null)
                        } else {
                            callback(err, {
                                msg: "添加成功",
                                code: 200,
                                type: 0
                            })
                        }
                    })
                }
            }
        ], function (err, result) {
            setError(err, res, db)
            res.json({
                result
            })
            db.close();
        })
    })
})

// 获取购物车列表

router.get("/getshopingcarlist", (req, res) => {
    var username = req.query.username
    conn((err, db) => {
        setError(err, res, db);
        db.collection("shopingcar").find({
            username
        }).toArray((err, result) => {
            setError(err, res, db);
            res.json({
                msg: "获取商品信息成功",
                code: 200,
                result
            })
            db.close()
        })
    })
})



//删除购物车中的商品
router.get("/deletegoods", (req, res) => {
    var goodsid = req.query.goodsid;
    var username = req.query.username;
    var query = req.query;
    conn((err, db) => {
        setError(err, res, db);
        db.collection("shopingcar").remove({
            _id: ObjectID(query.checkid)
        }, (err, result) => {
            setError(err, res, db);
            res.json({
                code: 200,
                msg: "删除成功",
                type: 1,
                result
            })
            db.close()
        })
    })
})

//增加或减少商品数量
router.get("/updategoods", (req, res) => {
    var query = req.query;
    query.goodsnum = query.goodsnum * 1;
    conn((err, db) => {
        setError(err, res, db);
        db.collection("shopingcar").update({
            goodsid: query.goodsid
        }, {
            $set: {
                goodsnum: query.goodsnum
            }
        }, (err, result) => {
            setError(err, res, db);
            res.json({
                msg: "修改成功",
                code: 200,
                result
            })
            db.close();
        })
    })
})


module.exports = router;