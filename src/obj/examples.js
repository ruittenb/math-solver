
const examples = [
    // x (x + 1) = 0
    {
        equation: {
            members: [{
                product: {
                    factors: [{
                        primitive: 'x'
                    }, {
                        sum: {
                            terms: [{
                                primitive: 'x'
                            }, {
                                primitive: '1'
                            }]
                        }
                    }]
                }
            },
            {
                primitive: '0'
            }]
        }
    },
    // 2x^2 + 3x - 1 = 0
    {
        equation: {
            members: [{
                sum: {
                    terms: [{
                        product: {
                            factors: [{
                                primitive: '2'
                            }, {
                                power: {
                                    base: {
                                        primitive: 'x'
                                    },
                                    exponent: {
                                        primitive: '2'
                                    }
                                }
                            }]
                        }
                    }, {
                        product: {
                            factors: [{
                                primitive: '3'
                            }, {
                                primitive: 'x'
                            }]
                        }
                    }, {
                        sign: '-',
                        primitive: '1'
                    }]
                }
            }, {
                primitive: '0'
            }]
        }
    },
    // x = y = ±5√2
    {
        equation: {
            members: [{
                primitive: 'x'
            }, {
                primitive: 'y'
            }, {
                product: {
                    factors: [{
                        sign: '±',
                        primitive: '5'
                    }, {
                        squareroot: {
                            primitive: '2'
                        }
                    }]
                }
            }]
        }
    },
    // x = ∛27
    {
        equation: {
            members: [{
                primitive: 'x'
            }, {
                cuberoot: {
                    primitive: '27'
                }
            }]
        }
    },
    // x = 5V3125
    {
        equation: {
            members: [{
                primitive: 'x'
            }, {
                root: {
                    index: {
                        sum: {
                            terms: [{
                                primitive: 'x'
                            }, {
                                primitive: '5'
                            }]
                        }
                    },
                    radicand: {
                        primitive: '3125'
                    }
                }
            }]
        }
    },
    // x = 1 v x = -4
    {
        or: {
            atoms: [{
                equation: {
                    members: [{
                        primitive: 'x'
                    }, {
                        primitive: '1'
                    }]
                }
            }, {
                equation: {
                    members: [{
                        primitive: 'x'
                    }, {
                        sign: '-',
                        primitive: '4'
                    }]
                }
            }]
        }
    },
    // quadratic formula
    {
        equation: {
            members: [{
                primitive: 'x' // sub 1,2
            }, {
                fraction: {
                    numerator: {
                        sum: {
                            terms: [{
                                sign: '-',
                                primitive: 'b'
                            }, {
                                sign: '±',
                                squareroot: {
                                    sum: {
                                        terms: [{
                                            power: {
                                                base: {
                                                    primitive: 'b'
                                                },
                                                exponent: {
                                                    primitive: '2'
                                                }
                                            }
                                        }, {
                                            sign: '-',
                                            product: {
                                                factors: [{
                                                    primitive: '4',
                                                }, {
                                                    primitive: 'a',
                                                }, {
                                                    primitive: 'c',
                                                }]
                                            }
                                        }]
                                    }
                                }
                            }]
                        }
                    },
                    denominator: {
                        product: {
                            factors: [{
                                primitive: '2'
                            }, {
                                primitive: 'a'
                            }]
                        }
                    }
                }
            }]
        }
    }
];

