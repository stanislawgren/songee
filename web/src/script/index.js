import getServerProps from '../utils/getServerProps.js'

const props = new getServerProps('getIndex', { example: 'example' })

const getProps = async () => {
    await props.call()
    console.log(props.user)
}

getProps()
