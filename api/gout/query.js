const {getAllGouts: getGouts} = require('./data')

module.exports.getAllGouts = async() => {
    const gouts = await getGouts()
    return gouts
}

module.exports.getOneGouts = async({id}) => {
    const gouts = await getGouts()
    return gouts.filter((gout) => gout.id == id)[0]
}