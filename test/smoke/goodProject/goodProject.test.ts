import { CMakeProject } from '@cmt/cmakeProject';
import { expect } from 'chai';

import { smokeSuite, smokeTestDefaultKit } from '@test/smoke/smoke';

suite('Smoke test: good project', () => {
    test('Successful configure', async () => {
        smokeSuite('Smoke test: good project', suite => {
            let cmakeProject: CMakeProject;
            suite.setup('create cmake-tools-fork', async test => {
                cmakeProject = await test.createCMakeProject({
                    kit: await smokeTestDefaultKit()
                });
            });
            suite.teardown('dispose cmake-tools-fork', async () => {
                if (cmakeProject) {
                    await cmakeProject.asyncDispose();
                }
            });
            suite.smokeTest('Successful configure', async () => {
                expect(await cmakeProject.configure()).to.eq(0);
            });
        });
    });
});
