export default [
    {
        type: 'input',
        name: "city",
        message: "What's the city?",
    },
    {
        type: 'input',
        name: "state",
        message: "What's the state?",
    },
    {
        type: 'list',
        name: 'option',
        message: 'Choose option below.',
        choices: [
            'Current Day',
            '7 Day Forecasts'
        ]
    }
]
