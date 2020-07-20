import React, { useState, useRef, useEffect } from "react";
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
    root: {
        display: "none"
    }
})

function Payment() {

    const classes = useStyles();

    const [paidFor, setPaidFor] = useState(false);
    const [loaded, setLoaded] = useState(false);

    let paypalRef = useRef()

    const lesson = {
        price: 25.00,
        description: "1 Hour lesson",
        type: "Functions",
        date: new Date(Date.now())
    };

    const dateDisplayOptions = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    }

    const timeDisplayOptions = {
        hour: "numeric",
        minute: "numeric"
    }

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.paypal.com/sdk/js?client-id=Adw-x4TG1epsSGJyMy4pDLK6LWDiuOXIsj1KGg68JyRYxG5l9pwGiemo6t0qQz0zfgOr6cFp7fxondyq&currency=CAD";
        script.addEventListener("load", () => setLoaded(true));

        document.body.appendChild(script);

        if (loaded) {
            setTimeout(() => {
                window.paypal
                    .Buttons({
                        createOrder: (data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        description: lesson.description,
                                        amount: {
                                            currency_code: "CAD",
                                            value: lesson.price
                                        }
                                    }
                                ]
                            });
                        },
                        onApprove: async (data, actions) => {
                            const order = await actions.order.capture();
                            setPaidFor(true)
                            console.log(order);
                        }
                    })
                    .render(paypalRef)
            });
        }
    });

    return (
        <div>
            {
                paidFor ? (
                    <div>

                    </div>
                ) : (
                    <Grid container>
                        <Grid item xs={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h3" gutterBottom>{lesson.type}</Typography>
                                    <Typography variant="body" gutterBottom>{lesson.description}</Typography>
                                    <br />
                                    <br />
                                    <Typography variant="body" gutterBottom> {lesson.date.toLocaleDateString('en-US', dateDisplayOptions)} </Typography>
                                    <br />
                                    
                                    <Typography variant="body" gutterBottom> {lesson.date.toLocaleTimeString('en-US', timeDisplayOptions)} </Typography>
                                    <br />
                                    <br />
                                    <Typography variant="body" gutterBottom> ${lesson.price} </Typography>
                                </CardContent>
                                <CardActions>
                                    <div ref={v => (paypalRef = v)} />
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                )
            }
        </div>
    )
} 

export default Payment;