import React from 'react';
import Popoverly from '../Popoverly';

export default {
    title: 'Popoverly',
    component: Popoverly,
};
export const popoverlyDefault = () => {
    return (
        <div
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '500px', height: '500px' }}
        >
            <Popoverly
                content={
                    <>
                        Whats up? dlfgjksldfgkj ölsdkfg sdlöfg sd fgölkjsdfg sdfadf asdf asd falkjdfhg ksdjfhg
                        sdkjfghsldkfjg sf gskjdhfgs kdfg lkjfg skdfgjh sdfkgj sdfgkjhs dfg sdfgkjhsd fgkjhdfg skjdfg
                        skldfjgh dlkfgjhsdkjfghsldkfjg sf gskjdhfgs kdfg lkjfg skdfgjh sdfkgj sdfgkjhs dfg sdfgkjhsd
                        fgkjhdfg skjdfg skldfjgh dlkfgjhsdkjfghsldkfjg sf
                    </>
                }
                position="left"
            >
                <button>Hi, click me</button>
            </Popoverly>
        </div>
    );
};
