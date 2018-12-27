import { wrapMapToPropsConstant, wrapMapToPropsFunc } from './wrapMapToProps';
import { checkMapStateToProps } from '../utils/check';

function whenMapStateToPropsIsFunction(mapStateToProps) {
  return wrapMapToPropsFunc(mapStateToProps, 'mapStateToProps');
}

function whenMapStateToPropsIsMissing() {
  return wrapMapToPropsConstant(() => ({}));
}

export default function (mapStateToProps) {
  checkMapStateToProps(mapStateToProps);

  if (typeof mapStateToProps === 'function') return whenMapStateToPropsIsFunction(mapStateToProps);
  if (!mapStateToProps) return whenMapStateToPropsIsMissing(mapStateToProps);

  return mapStateToProps;
}
