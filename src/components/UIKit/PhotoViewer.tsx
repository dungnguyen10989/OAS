import * as React from 'react';
import PhotoView, { MerryPhotoViewPorps } from '@merryjs/photo-viewer';

export class PhotoClass extends React.PureComponent<any, MerryPhotoViewPorps> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      hideCloseButton: false,
      hideShareButton: true,
      hideStatusBar: true,
      initial: 0,
      onChange: () => {},
      onDismiss: () => {},
      shareText: 'Share',
      visible: false
    };
  }

  show = (obj: MerryPhotoViewPorps): void => {
    this.setState({ ...obj, visible: true });
  };

  render() {
    const {
      data,
      hideCloseButton,
      hideShareButton,
      hideStatusBar,
      initial,
      onChange,
      onDismiss,
      shareText,
      visible
    } = this.state;
    return (
      <PhotoView
        visible={visible}
        data={data}
        hideStatusBar={hideStatusBar}
        hideCloseButton={hideCloseButton}
        hideShareButton={hideShareButton}
        initial={initial}
        onChange={onChange}
        shareText={shareText}
        onDismiss={() => {
          this.setState({ visible: false });
          onDismiss();
        }}
      />
    );
  }
}

// const Ref = React.createRef<PhotoViewer>();

const Viewer = React.forwardRef<PhotoClass, any>((props, ref) => (
  <PhotoClass {...props} ref={ref} />
));

export default Viewer;
