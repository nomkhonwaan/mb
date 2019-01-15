package com.nomkhonwaan.mb.server.exception;

import graphql.ErrorType;
import graphql.GraphQLError;
import graphql.GraphQLException;
import graphql.language.SourceLocation;
import org.springframework.http.HttpStatus;

import java.util.List;

public class UnauthorizedException extends GraphQLException implements GraphQLError {
    public UnauthorizedException() {
        super(HttpStatus.UNAUTHORIZED.toString());
    }

    public UnauthorizedException(String message) {
        super(message);
    }

    @Override
    public List<SourceLocation> getLocations() {
        return null;
    }

    @Override
    public ErrorType getErrorType() {
        return ErrorType.ExecutionAborted;
    }
}
