import { z } from 'zod';
/**
 * Host-side parse of what a browser provider answers. `data` stays whatever
 * the service produced: the host hands it to the agent as is, and only
 * `browser.capture` is read further (the image the host writes to disk).
 */
export declare const browserProviderResultSchema: z.ZodUnion<readonly [z.ZodObject<{
    ok: z.ZodLiteral<true>;
    data: z.ZodObject<{}, z.core.$loose>;
}, z.core.$strip>, z.ZodObject<{
    ok: z.ZodLiteral<false>;
    error: z.ZodString;
}, z.core.$strip>]>;
export declare const browserControlActionSchema: z.ZodEnum<{
    "browser.back": "browser.back";
    "browser.capture": "browser.capture";
    "browser.click": "browser.click";
    "browser.close": "browser.close";
    "browser.forward": "browser.forward";
    "browser.inspect": "browser.inspect";
    "browser.open": "browser.open";
    "browser.resize": "browser.resize";
    "browser.scroll": "browser.scroll";
    "browser.select": "browser.select";
    "browser.snapshot": "browser.snapshot";
    "browser.type": "browser.type";
}>;
/** Wire 1 of the source-control role, as the host parses it. `data[method]` checks an `ok: true` answer's `data`. */
export declare const sourceControlProviderSchemasV1: {
    envelope: z.ZodUnion<readonly [z.ZodObject<{
        ok: z.ZodLiteral<true>;
        data: z.ZodJSONSchema;
    }, z.core.$strict>, z.ZodObject<{
        ok: z.ZodLiteral<false>;
        error: z.ZodObject<{
            message: z.ZodString;
            status: z.ZodOptional<z.ZodNumber>;
            code: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
    }, z.core.$strict>]>;
    error: z.ZodObject<{
        message: z.ZodString;
        status: z.ZodOptional<z.ZodNumber>;
        code: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
    forgeUser: z.ZodObject<{
        id: z.ZodNumber;
        login: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        avatarUrl: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    probe: z.ZodObject<{
        supported: z.ZodBoolean;
        version: z.ZodOptional<z.ZodString>;
        message: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    changeRequestHead: z.ZodObject<{
        project: z.ZodObject<{
            id: z.ZodString;
            owner: z.ZodString;
            name: z.ZodString;
        }, z.core.$strict>;
        headSha: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
        headBranch: z.ZodString;
        headOwner: z.ZodString;
    }, z.core.$strip>;
    changeRequestSource: z.ZodObject<{
        sourceProject: z.ZodObject<{
            id: z.ZodString;
            owner: z.ZodString;
            name: z.ZodString;
        }, z.core.$strict>;
        targetProject: z.ZodObject<{
            id: z.ZodString;
            owner: z.ZodString;
            name: z.ZodString;
        }, z.core.$strict>;
        classification: z.ZodEnum<{
            "contributor-fork": "contributor-fork";
            "same-repository": "same-repository";
        }>;
        headSha: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
        headRef: z.ZodString;
        endpoint: z.ZodString;
    }, z.core.$strip>;
    mutationTarget: z.ZodObject<{
        repositoryId: z.ZodString;
        bindingRevision: z.ZodNumber;
        primaryRemote: z.ZodString;
        project: z.ZodObject<{
            id: z.ZodString;
            owner: z.ZodString;
            name: z.ZodString;
        }, z.core.$strict>;
        number: z.ZodOptional<z.ZodNumber>;
        head: z.ZodOptional<z.ZodString>;
        base: z.ZodOptional<z.ZodString>;
        headSha: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
    mutationResolution: z.ZodObject<{
        providerTarget: z.ZodRecord<z.ZodString, z.ZodJSONSchema>;
        target: z.ZodObject<{
            repositoryId: z.ZodString;
            bindingRevision: z.ZodNumber;
            primaryRemote: z.ZodString;
            project: z.ZodObject<{
                id: z.ZodString;
                owner: z.ZodString;
                name: z.ZodString;
            }, z.core.$strict>;
            number: z.ZodOptional<z.ZodNumber>;
            head: z.ZodOptional<z.ZodString>;
            base: z.ZodOptional<z.ZodString>;
            headSha: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
    }, z.core.$strict>;
    mutationResult: z.ZodObject<{
        project: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            owner: z.ZodString;
            name: z.ZodString;
        }, z.core.$strict>>;
        number: z.ZodOptional<z.ZodNumber>;
        head: z.ZodOptional<z.ZodString>;
        base: z.ZodOptional<z.ZodString>;
        headSha: z.ZodOptional<z.ZodString>;
        state: z.ZodOptional<z.ZodString>;
        merged: z.ZodOptional<z.ZodBoolean>;
        outcome: z.ZodOptional<z.ZodEnum<{
            merging: "merging";
            queued: "queued";
        }>>;
        stacked: z.ZodOptional<z.ZodBoolean>;
        ready: z.ZodOptional<z.ZodBoolean>;
        commented: z.ZodOptional<z.ZodBoolean>;
        failureStatus: z.ZodOptional<z.ZodNumber>;
        failureCode: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
    reconcile: z.ZodObject<{
        state: z.ZodEnum<{
            failed: "failed";
            "outcome-unknown": "outcome-unknown";
            succeeded: "succeeded";
        }>;
        result: z.ZodOptional<z.ZodObject<{
            project: z.ZodOptional<z.ZodObject<{
                id: z.ZodString;
                owner: z.ZodString;
                name: z.ZodString;
            }, z.core.$strict>>;
            number: z.ZodOptional<z.ZodNumber>;
            head: z.ZodOptional<z.ZodString>;
            base: z.ZodOptional<z.ZodString>;
            headSha: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            merged: z.ZodOptional<z.ZodBoolean>;
            outcome: z.ZodOptional<z.ZodEnum<{
                merging: "merging";
                queued: "queued";
            }>>;
            stacked: z.ZodOptional<z.ZodBoolean>;
            ready: z.ZodOptional<z.ZodBoolean>;
            commented: z.ZodOptional<z.ZodBoolean>;
            failureStatus: z.ZodOptional<z.ZodNumber>;
            failureCode: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>;
    }, z.core.$strict>;
    liveSummaries: z.ZodObject<{
        summaries: z.ZodArray<z.ZodObject<{
            owner: z.ZodString;
            repo: z.ZodString;
            number: z.ZodNumber;
            state: z.ZodEnum<{
                closed: "closed";
                merged: "merged";
                open: "open";
            }>;
            draft: z.ZodBoolean;
            title: z.ZodString;
            mergeable: z.ZodNullable<z.ZodBoolean>;
            mergeableState: z.ZodNullable<z.ZodString>;
            checks: z.ZodNullable<z.ZodObject<{
                state: z.ZodString;
            }, z.core.$loose>>;
            headSha: z.ZodOptional<z.ZodString>;
            base: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        issueSummaries: z.ZodArray<z.ZodObject<{
            owner: z.ZodString;
            repo: z.ZodString;
            number: z.ZodNumber;
            title: z.ZodString;
            state: z.ZodEnum<{
                completed: "completed";
                not_planned: "not_planned";
                open: "open";
            }>;
        }, z.core.$strip>>;
    }, z.core.$strip>;
    changeRequestStatus: z.ZodObject<{
        identity: z.ZodObject<{
            provider: z.ZodString;
            instance: z.ZodString;
        }, z.core.$loose>;
        fetchedAt: z.ZodOptional<z.ZodNumber>;
        project: z.ZodNullable<z.ZodObject<{
            provider: z.ZodString;
            instance: z.ZodString;
            id: z.ZodString;
            owner: z.ZodString;
            name: z.ZodString;
            url: z.ZodString;
        }, z.core.$loose>>;
        branch: z.ZodString;
        changeRequest: z.ZodNullable<z.ZodObject<{
            provider: z.ZodString;
            instance: z.ZodString;
            id: z.ZodString;
            number: z.ZodNumber;
            project: z.ZodObject<{
                provider: z.ZodString;
                instance: z.ZodString;
                id: z.ZodString;
                owner: z.ZodString;
                name: z.ZodString;
                url: z.ZodString;
            }, z.core.$loose>;
            title: z.ZodString;
            url: z.ZodString;
            state: z.ZodEnum<{
                closed: "closed";
                merged: "merged";
                open: "open";
            }>;
            draft: z.ZodBoolean;
            base: z.ZodString;
            head: z.ZodString;
        }, z.core.$loose>>;
        ci: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            summary: z.ZodObject<{
                state: z.ZodString;
            }, z.core.$loose>;
        }, z.core.$loose>>>;
        canMerge: z.ZodOptional<z.ZodBoolean>;
        defaultBranch: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        resolvedRemoteName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        localRevision: z.ZodOptional<z.ZodObject<{
            sha: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
            changeId: z.ZodNullable<z.ZodString>;
            uploadedAs: z.ZodNullable<z.ZodNumber>;
        }, z.core.$strict>>;
        stack: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            number: z.ZodNullable<z.ZodNumber>;
            base: z.ZodString;
            layers: z.ZodArray<z.ZodObject<{
                number: z.ZodNumber;
                title: z.ZodString;
                url: z.ZodString;
                state: z.ZodEnum<{
                    closed: "closed";
                    merged: "merged";
                    open: "open";
                }>;
                draft: z.ZodBoolean;
                head: z.ZodString;
            }, z.core.$loose>>;
        }, z.core.$loose>>>;
    }, z.core.$strict>;
    passThrough: z.ZodUnion<readonly [z.ZodRecord<z.ZodString, z.ZodJSONSchema>, z.ZodArray<z.ZodJSONSchema>]>;
    outboundRequest: z.ZodObject<{
        method: z.ZodEnum<{
            DELETE: "DELETE";
            GET: "GET";
            PATCH: "PATCH";
            POST: "POST";
            PUT: "PUT";
        }>;
        path: z.ZodString;
        query: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodEnum<{
            accept: "accept";
            "content-type": "content-type";
            "if-none-match": "if-none-match";
            range: "range";
        }> & z.core.$partial, z.ZodString>>;
        body: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
    data: {
        'auth.verify': z.ZodObject<{
            user: z.ZodObject<{
                id: z.ZodNumber;
                login: z.ZodString;
                name: z.ZodOptional<z.ZodString>;
                email: z.ZodOptional<z.ZodString>;
                avatarUrl: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>;
        }, z.core.$strip>;
        'auth.probe': z.ZodObject<{
            supported: z.ZodBoolean;
            version: z.ZodOptional<z.ZodString>;
            message: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
        changeRequestStatus: z.ZodObject<{
            identity: z.ZodObject<{
                provider: z.ZodString;
                instance: z.ZodString;
            }, z.core.$loose>;
            fetchedAt: z.ZodOptional<z.ZodNumber>;
            project: z.ZodNullable<z.ZodObject<{
                provider: z.ZodString;
                instance: z.ZodString;
                id: z.ZodString;
                owner: z.ZodString;
                name: z.ZodString;
                url: z.ZodString;
            }, z.core.$loose>>;
            branch: z.ZodString;
            changeRequest: z.ZodNullable<z.ZodObject<{
                provider: z.ZodString;
                instance: z.ZodString;
                id: z.ZodString;
                number: z.ZodNumber;
                project: z.ZodObject<{
                    provider: z.ZodString;
                    instance: z.ZodString;
                    id: z.ZodString;
                    owner: z.ZodString;
                    name: z.ZodString;
                    url: z.ZodString;
                }, z.core.$loose>;
                title: z.ZodString;
                url: z.ZodString;
                state: z.ZodEnum<{
                    closed: "closed";
                    merged: "merged";
                    open: "open";
                }>;
                draft: z.ZodBoolean;
                base: z.ZodString;
                head: z.ZodString;
            }, z.core.$loose>>;
            ci: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                summary: z.ZodObject<{
                    state: z.ZodString;
                }, z.core.$loose>;
            }, z.core.$loose>>>;
            canMerge: z.ZodOptional<z.ZodBoolean>;
            defaultBranch: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            resolvedRemoteName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            localRevision: z.ZodOptional<z.ZodObject<{
                sha: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
                changeId: z.ZodNullable<z.ZodString>;
                uploadedAs: z.ZodNullable<z.ZodNumber>;
            }, z.core.$strict>>;
            stack: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                number: z.ZodNullable<z.ZodNumber>;
                base: z.ZodString;
                layers: z.ZodArray<z.ZodObject<{
                    number: z.ZodNumber;
                    title: z.ZodString;
                    url: z.ZodString;
                    state: z.ZodEnum<{
                        closed: "closed";
                        merged: "merged";
                        open: "open";
                    }>;
                    draft: z.ZodBoolean;
                    head: z.ZodString;
                }, z.core.$loose>>;
            }, z.core.$loose>>>;
        }, z.core.$strict>;
        listChangeRequests: z.ZodUnion<readonly [z.ZodRecord<z.ZodString, z.ZodJSONSchema>, z.ZodArray<z.ZodJSONSchema>]>;
        changeRequestContext: z.ZodUnion<readonly [z.ZodRecord<z.ZodString, z.ZodJSONSchema>, z.ZodArray<z.ZodJSONSchema>]>;
        listIssues: z.ZodUnion<readonly [z.ZodRecord<z.ZodString, z.ZodJSONSchema>, z.ZodArray<z.ZodJSONSchema>]>;
        getIssue: z.ZodUnion<readonly [z.ZodRecord<z.ZodString, z.ZodJSONSchema>, z.ZodArray<z.ZodJSONSchema>]>;
        issueComments: z.ZodUnion<readonly [z.ZodRecord<z.ZodString, z.ZodJSONSchema>, z.ZodArray<z.ZodJSONSchema>]>;
        projectUpstream: z.ZodUnion<readonly [z.ZodRecord<z.ZodString, z.ZodJSONSchema>, z.ZodArray<z.ZodJSONSchema>]>;
        projectBranches: z.ZodUnion<readonly [z.ZodRecord<z.ZodString, z.ZodJSONSchema>, z.ZodArray<z.ZodJSONSchema>]>;
        listLabels: z.ZodUnion<readonly [z.ZodRecord<z.ZodString, z.ZodJSONSchema>, z.ZodArray<z.ZodJSONSchema>]>;
        listReviewerCandidates: z.ZodUnion<readonly [z.ZodRecord<z.ZodString, z.ZodJSONSchema>, z.ZodArray<z.ZodJSONSchema>]>;
        readChangeRequestPatch: z.ZodUnion<readonly [z.ZodRecord<z.ZodString, z.ZodJSONSchema>, z.ZodArray<z.ZodJSONSchema>]>;
        readChangeRequestFile: z.ZodUnion<readonly [z.ZodRecord<z.ZodString, z.ZodJSONSchema>, z.ZodArray<z.ZodJSONSchema>]>;
        liveSummaries: z.ZodObject<{
            summaries: z.ZodArray<z.ZodObject<{
                owner: z.ZodString;
                repo: z.ZodString;
                number: z.ZodNumber;
                state: z.ZodEnum<{
                    closed: "closed";
                    merged: "merged";
                    open: "open";
                }>;
                draft: z.ZodBoolean;
                title: z.ZodString;
                mergeable: z.ZodNullable<z.ZodBoolean>;
                mergeableState: z.ZodNullable<z.ZodString>;
                checks: z.ZodNullable<z.ZodObject<{
                    state: z.ZodString;
                }, z.core.$loose>>;
                headSha: z.ZodOptional<z.ZodString>;
                base: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>>;
            issueSummaries: z.ZodArray<z.ZodObject<{
                owner: z.ZodString;
                repo: z.ZodString;
                number: z.ZodNumber;
                title: z.ZodString;
                state: z.ZodEnum<{
                    completed: "completed";
                    not_planned: "not_planned";
                    open: "open";
                }>;
            }, z.core.$strip>>;
        }, z.core.$strip>;
        readChangeRequestHead: z.ZodObject<{
            project: z.ZodObject<{
                id: z.ZodString;
                owner: z.ZodString;
                name: z.ZodString;
            }, z.core.$strict>;
            headSha: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
            headBranch: z.ZodString;
            headOwner: z.ZodString;
        }, z.core.$strip>;
        resolveChangeRequestSource: z.ZodObject<{
            sourceProject: z.ZodObject<{
                id: z.ZodString;
                owner: z.ZodString;
                name: z.ZodString;
            }, z.core.$strict>;
            targetProject: z.ZodObject<{
                id: z.ZodString;
                owner: z.ZodString;
                name: z.ZodString;
            }, z.core.$strict>;
            classification: z.ZodEnum<{
                "contributor-fork": "contributor-fork";
                "same-repository": "same-repository";
            }>;
            headSha: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
            headRef: z.ZodString;
            endpoint: z.ZodString;
        }, z.core.$strip>;
        'mutation.resolveTarget': z.ZodObject<{
            providerTarget: z.ZodRecord<z.ZodString, z.ZodJSONSchema>;
            target: z.ZodObject<{
                repositoryId: z.ZodString;
                bindingRevision: z.ZodNumber;
                primaryRemote: z.ZodString;
                project: z.ZodObject<{
                    id: z.ZodString;
                    owner: z.ZodString;
                    name: z.ZodString;
                }, z.core.$strict>;
                number: z.ZodOptional<z.ZodNumber>;
                head: z.ZodOptional<z.ZodString>;
                base: z.ZodOptional<z.ZodString>;
                headSha: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>;
        }, z.core.$strict>;
        'mutation.perform': z.ZodObject<{
            project: z.ZodOptional<z.ZodObject<{
                id: z.ZodString;
                owner: z.ZodString;
                name: z.ZodString;
            }, z.core.$strict>>;
            number: z.ZodOptional<z.ZodNumber>;
            head: z.ZodOptional<z.ZodString>;
            base: z.ZodOptional<z.ZodString>;
            headSha: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            merged: z.ZodOptional<z.ZodBoolean>;
            outcome: z.ZodOptional<z.ZodEnum<{
                merging: "merging";
                queued: "queued";
            }>>;
            stacked: z.ZodOptional<z.ZodBoolean>;
            ready: z.ZodOptional<z.ZodBoolean>;
            commented: z.ZodOptional<z.ZodBoolean>;
            failureStatus: z.ZodOptional<z.ZodNumber>;
            failureCode: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
        'mutation.reconcile': z.ZodObject<{
            state: z.ZodEnum<{
                failed: "failed";
                "outcome-unknown": "outcome-unknown";
                succeeded: "succeeded";
            }>;
            result: z.ZodOptional<z.ZodObject<{
                project: z.ZodOptional<z.ZodObject<{
                    id: z.ZodString;
                    owner: z.ZodString;
                    name: z.ZodString;
                }, z.core.$strict>>;
                number: z.ZodOptional<z.ZodNumber>;
                head: z.ZodOptional<z.ZodString>;
                base: z.ZodOptional<z.ZodString>;
                headSha: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                merged: z.ZodOptional<z.ZodBoolean>;
                outcome: z.ZodOptional<z.ZodEnum<{
                    merging: "merging";
                    queued: "queued";
                }>>;
                stacked: z.ZodOptional<z.ZodBoolean>;
                ready: z.ZodOptional<z.ZodBoolean>;
                commented: z.ZodOptional<z.ZodBoolean>;
                failureStatus: z.ZodOptional<z.ZodNumber>;
                failureCode: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>>;
        }, z.core.$strict>;
    };
};
export declare const sourceControlProviderMethodSchema: z.ZodEnum<{
    "auth.probe": "auth.probe";
    "auth.verify": "auth.verify";
    changeRequestContext: "changeRequestContext";
    changeRequestStatus: "changeRequestStatus";
    getIssue: "getIssue";
    issueComments: "issueComments";
    listChangeRequests: "listChangeRequests";
    listIssues: "listIssues";
    listLabels: "listLabels";
    listReviewerCandidates: "listReviewerCandidates";
    liveSummaries: "liveSummaries";
    "mutation.perform": "mutation.perform";
    "mutation.reconcile": "mutation.reconcile";
    "mutation.resolveTarget": "mutation.resolveTarget";
    projectBranches: "projectBranches";
    projectUpstream: "projectUpstream";
    readChangeRequestFile: "readChangeRequestFile";
    readChangeRequestHead: "readChangeRequestHead";
    readChangeRequestPatch: "readChangeRequestPatch";
    resolveChangeRequestSource: "resolveChangeRequestSource";
}>;
