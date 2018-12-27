import theme from 'mdx-deck/themes'
import { coy } from 'react-syntax-highlighter/dist/styles/prism'

export default {
  ...theme,
  code: {
    backgroundColor: 'rgba(27,31,35,.05)',
    padding: '.2em .4em',
    color: 'black',
    borderRadius: '.3em'
  },
  img: {
    width: '66%'
  },
  prism: {
    style: coy
  }
}
