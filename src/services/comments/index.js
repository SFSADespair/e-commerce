export const getComments = async() => {
    try {
        const dummyData = [{
                "username": "Clyde",
                "rating": 4.5,
                "review": "I can finally play Yu-Gi Oh with me friends",
                "Date": "21 July 2022",
                "ProductID": 1239899
            },
            {
                "username": "Clyde",
                "rating": 4.5,
                "review": "I can finally play Yu-Gi Oh with me friends",
                "Date": "21 July 2022",
                "ProductID": 1239899
            },
            {
                "username": "Clyde",
                "rating": 4.5,
                "review": "I can finally play Yu-Gi Oh with me friends",
                "Date": "21 July 2022",
                "ProductID": 1239899
            },
            {
                "username": "Clyde",
                "rating": 4.5,
                "review": "I can finally play Yu-Gi Oh with me friends",
                "Date": "21 July 2022",
                "ProductID": 1239899
            }
        ]
        return dummyData
    } catch (e) {
        console.log(e)
    }
}