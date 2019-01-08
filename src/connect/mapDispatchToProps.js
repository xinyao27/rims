import bindActionCreators from './bindActionCreators';
import { wrapMapToPropsConstant } from './wrapMapToProps';
import { checkMapDispatchToProps } from '../utils/check';
import { isObject } from '../utils/utils';

function whenMapDispatchToPropsIsMissing() {
  return () => wrapMapToPropsConstant({});
}

function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
  return dispatch => wrapMapToPropsConstant(bindActionCreators(mapDispatchToProps, dispatch));
}

export default function (mapDispatchToProps) {
  checkMapDispatchToProps(mapDispatchToProps);

  if (!mapDispatchToProps) return whenMapDispatchToPropsIsMissing();
  if (isObject(mapDispatchToProps)) return whenMapDispatchToPropsIsObject(mapDispatchToProps);

  return {};
}
