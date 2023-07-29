/**
 * WordPress dependencies
 */
import { createPortal, useEffect, useRef, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Popover from '..';
import { Provider as SlotFillProvider } from '../../slot-fill';
import type { WordPressComponentProps } from '../../ui/context';

const GenericIframe = ( {
	children,
	...props
}: WordPressComponentProps< { children: React.ReactNode }, 'iframe' > ) => {
	const [ isMounted, setIsMounted ] = useState( false );
	const iframeRef = useRef< HTMLIFrameElement >( null );

	useEffect( () => {
		setIsMounted( true );
	}, [] );

	return (
		<iframe { ...props } title="My Iframe" ref={ iframeRef }>
			{ isMounted &&
				iframeRef.current?.contentWindow &&
				createPortal(
					children,
					iframeRef.current.contentWindow.document.body
				) }
		</iframe>
	);
};

export const PopoverInsideIframeRenderedInExternalSlot = (
	props: React.ComponentProps< typeof Popover >
) => {
	const SLOT_NAME = 'my-slot';
	const [ anchorRef, setAnchorRef ] =
		useState< HTMLParagraphElement | null >();

	return (
		<SlotFillProvider>
			{ /* @ts-expect-error Slot is not currently typed on Popover */ }
			<Popover.Slot name={ SLOT_NAME } />
			<GenericIframe
				style={ {
					width: '100%',
					height: '400px',
					border: '0',
					outline: '1px solid purple',
				} }
			>
				<div
					style={ {
						height: '200vh',
						paddingTop: '10vh',
					} }
				>
					<p
						style={ {
							padding: '8px',
							background: 'salmon',
							maxWidth: '200px',
							marginTop: '100px',
							marginLeft: 'auto',
							marginRight: 'auto',
						} }
						ref={ setAnchorRef }
					>
						Popover&apos;s anchor
					</p>
					<Popover
						{ ...props }
						__unstableSlotName={ SLOT_NAME }
						anchor={ anchorRef }
					/>
				</div>
			</GenericIframe>
		</SlotFillProvider>
	);
};
