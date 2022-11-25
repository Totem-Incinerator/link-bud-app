require('dotenv').config()

const host = process.env.DB_NAME


const deleteEspecialCharacters = (str = '') => {
    const nameDry = str.replace('/[^a-zA-Z 0-9.]+/g', '')
    return nameDry
}

const stringToSlug = (str = '') => {
    const dryName = deleteEspecialCharacters(str)
    const slugName = dryName.split(' ').join('-')
    return slugName
}

const generateLink = (name = '', userId = 0) =>{
    const slugName = stringToSlug(name)
    const url = `https://${host}.com/${userId}/${slugName}`
    return url
}

module.exports = {
    generateLink,
    stringToSlug
}