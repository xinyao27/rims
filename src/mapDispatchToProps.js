import { bindActionCreators } from 'redux';
import { wrapMapToPropsConstant } from './wrapMapToProps';
import { checkMapDispatchToProps } from './check';
import { isObject } from './utils';

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
